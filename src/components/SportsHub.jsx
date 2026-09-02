import React from 'react';
import { Trophy, Calendar, Globe, ExternalLink, ShieldCheck, Flag, ArrowRight } from 'lucide-react';

export default function SportsHub({ sports, onNavigate }) {
  const tournaments = [
    {
      id: '2018FIFAWorldCup',
      title: '2018 FIFA World Cup Russia',
      subtitle: '21st Men\'s International Football Championship',
      banner: 'pics/Sports/2018FIFAWorldCup/1.jpg',
      badge: 'FIFA World Cup',
      sections: [
        { label: 'Full Group Schedule & Results', link: '2018FIFAWorldCupGroupSchedule.html' },
        { label: 'Round of 16 (Knockout)', link: '2018FIFAWorldCupknockoutstageRoundof16.html' },
        { label: 'Quarter-Finals', link: '2018FIFAWorldCupQuarterfinals.html' },
        { label: 'Semi-Finals', link: '2018FIFAWorldCupSemifinals.html' },
        { label: 'Third-Place Play-off', link: '2018FIFAWorldCupThirdplaceplayoff.html' },
        { label: 'World Cup Final 2018', link: '2018FIFAWorldCupFinal.html' }
      ]
    },
    {
      id: '2018WomensHockeyWorldCup',
      title: '2018 Women\'s Hockey World Cup',
      subtitle: 'London, United Kingdom • 14th Hockey World Championship',
      banner: 'pics/Sports/2018WomensHockeyWorldCup/1.jpg',
      badge: 'Hockey World Cup',
      sections: [
        { label: 'Pool Matches & Match Schedule', link: '2018WomensHockeyWorldCupPoolSchedule.html' },
        { label: 'Tournament Overview', link: '2018WomensHockeyWorldCup.html' }
      ]
    },
    {
      id: 'ISL2018',
      title: 'Indian Super League (ISL 2018)',
      subtitle: 'Top Tier Football League in India',
      banner: 'pics/Sports/ISL2018/1.jpg',
      badge: 'ISL Football',
      sections: [
        { label: 'Fixtures, Timings & Stadiums', link: 'ISL2018.html' }
      ]
    }
  ];

  return (
    <div className="sports-hub-root">
      <div className="sports-hub-banner">
        <div className="badge badge-gold">
          <Trophy size={14} />
          GLOBAL SPORTS & TOURNAMENTS
        </div>
        <h2 className="sports-main-heading">Sports & Major Tournaments</h2>
        <p className="sports-subtext">
          Interactive schedules, knockout stage brackets, and scores for major sports championships.
        </p>
      </div>

      <div className="tournaments-grid">
        {tournaments.map((tour, idx) => (
          <div key={idx} className="tournament-card glass-card">
            <div className="tour-header">
              <div className="tour-badge-wrap">
                <span className="badge badge-gold">{tour.badge}</span>
              </div>
              <h3 className="tour-title">{tour.title}</h3>
              <p className="tour-sub">{tour.subtitle}</p>
            </div>

            <div className="tour-body">
              <span className="section-label">Available Match Schedules & Hubs:</span>
              <div className="sections-list">
                {tour.sections.map((sec, sIdx) => {
                  const targetSlug = sec.link.replace('.html', '');
                  return (
                    <button 
                      key={sIdx} 
                      className="section-link-row"
                      onClick={() => {
                        if (onNavigate) onNavigate(`sports/${targetSlug}`);
                      }}
                    >
                      <div className="sec-dot" />
                      <span className="sec-title">{sec.label}</span>
                      <ArrowRight size={14} className="sec-arrow" />
                    </button>
                  );
                })}
              </div>

              <div className="tour-footer-action">
                <button 
                  className="btn btn-gold btn-sm w-full"
                  onClick={() => {
                    if (onNavigate) onNavigate(`sports/${tour.id}`);
                  }}
                >
                  <Trophy size={14} />
                  <span>View Tournament Hub & Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
