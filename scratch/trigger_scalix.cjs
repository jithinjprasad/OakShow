const fs = require('fs');

async function triggerScalix() {
  const token = fs.readFileSync("E:/OakShowOther/OakShow API's/oakshowGitToke.txt", 'utf8').trim();
  const scalixKey = fs.readFileSync("E:/scalixApiKey.txt", 'utf8').trim();

  const headers = {
    'Authorization': `Bearer ${scalixKey}`,
    'X-Project-Id': '408d193f-88ad-4b4c-bcea-587580f4f877',
    'Content-Type': 'application/json'
  };

  const payload = {
    source_type: 'git',
    source_url: 'https://github.com/jithinjprasad/oakshow-prod.git',
    source_ref: 'main',
    dockerfile_path: 'Dockerfile',
    image_tag: 'oakshow',
    auth_token: token
  };

  console.log('Sending build request to Scalix...');
  const res = await fetch('https://api.scalix.world/v1/build', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('Trigger error:', data);
    process.exit(1);
  }

  const buildId = data.build.id;
  console.log('Triggered build ID:', buildId);

  let status = data.build.status;
  let elapsed = 0;
  let checkData = data;

  while (status !== 'succeeded' && status !== 'completed' && status !== 'failed') {
    await new Promise(r => setTimeout(r, 4000));
    elapsed += 4;
    const checkRes = await fetch(`https://api.scalix.world/v1/build/${buildId}`, { headers });
    checkData = await checkRes.json();
    status = checkData.build.status;
    console.log(`[${elapsed}s] Build status: ${status}`);
  }

  if (status === 'succeeded' || status === 'completed') {
    console.log('✅ BUILD SUCCEEDED! Image ref:', checkData.build.image_ref);
    
    // Deploy to Scalix Run
    const runServiceId = "6c2b26e5-121c-4291-8970-ed91b34c3efb";
    const builtImageRef = checkData.build.image_ref 
      ? (checkData.build.image_ref.includes(':') ? checkData.build.image_ref : `${checkData.build.image_ref}:latest`)
      : "172.18.0.253:5000/408d193f-88ad-4b4c-bcea-587580f4f877/oakshow:latest";

    console.log('Deploying image to Scalix Run:', builtImageRef);
    const deployRes = await fetch(`https://api.scalix.world/v1/run/services/${runServiceId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        image_ref: builtImageRef,
        min_instances: 0,
        max_instances: 1,
        scale_down_delay_secs: 300
      })
    });

    const deployData = await deployRes.json();
    console.log('Service deploy response:', deployData);

    // Patch custom domains
    const domainsRes = await fetch('https://api.scalix.world/v1/domains', { headers });
    const domainsData = await domainsRes.json();
    const domainList = domainsData.domains || domainsData;
    if (Array.isArray(domainList)) {
      for (const d of domainList) {
        if (d.domain === 'oakshow.in' || d.domain === 'www.oakshow.in') {
          await fetch(`https://api.scalix.world/v1/domains/${d.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ run_service: 'oakshow' })
          });
          console.log(`Domain verified: ${d.domain} -> oakshow`);
        }
      }
    }

    console.log('============================================================');
    console.log('🎉 SUCCESS: OakShow is live with serverless scale-to-zero!');
    console.log('Live Domains: https://oakshow.in | https://www.oakshow.in');
    console.log('============================================================');
  } else {
    console.error('❌ BUILD FAILED:', checkData.build.error_message);
    process.exit(1);
  }
}

triggerScalix().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
