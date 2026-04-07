'use client';

import { Country } from '@/types/country';
import styles from './IntersectionCard.module.scss';

interface IntersectionCardProps {
  country1: Country | null;
  country2: Country | null;
}

export default function IntersectionCard({
  country1,
  country2,
}: IntersectionCardProps) {
  if (!country1 || !country2) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>INTERSECTION PROTOCOLS</h3>
        <div className={styles.noData}>
          SELECT BOTH COUNTRIES TO VIEW COMPARISON
        </div>
      </div>
    );
  }

  const getLanguages = (c: Country) => Object.values(c.languages || {});
  const getCurrencies = (c: Country) =>
    Object.values(c.currencies || {}).map(c => c.name);
  const getTimezones = (c: Country) => c.timezones || [];

  const lang1 = getLanguages(country1);
  const lang2 = getLanguages(country2);
  const sharedLanguages = lang1.filter(l => lang2.includes(l));
  const uniqueLang1 = lang1.filter(l => !lang2.includes(l));
  const uniqueLang2 = lang2.filter(l => !lang1.includes(l));

  const curr1 = getCurrencies(country1);
  const curr2 = getCurrencies(country2);
  const sharedCurrencies = curr1.filter(c => curr2.includes(c));
  const uniqueCurr1 = curr1.filter(c => !curr2.includes(c));
  const uniqueCurr2 = curr2.filter(c => !curr1.includes(c));

  const tz1 = getTimezones(country1);
  const tz2 = getTimezones(country2);
  const sharedTimezones = tz1.filter(t => tz2.includes(t));
  const uniqueTz1 = tz1.filter(t => !tz2.includes(t));
  const uniqueTz2 = tz2.filter(t => !tz1.includes(t));

  const border1 = country1.borders || [];
  const border2 = country2.borders || [];
  const sharedBorders = border1.filter(b => border2.includes(b));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>INTERSECTION PROTOCOLS</h3>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>SHARED LANGUAGES</div>
        {sharedLanguages.length > 0 ? (
          <div className={styles.shared}>
            {sharedLanguages.map(lang => (
              <span key={lang} className={styles.tag}>
                ✓ {lang}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.noData}>NONE DETECTED</div>
        )}
        <div className={styles.uniqueRow}>
          <div className={styles.uniqueColumn}>
            <span className={styles.uniqueLabel} style={{ color: '#00FFD1' }}>
              {country1.name.common}
            </span>
            {uniqueLang1.map(lang => (
              <span key={lang} className={styles.uniqueTag}>
                {lang}
              </span>
            ))}
          </div>
          <div className={styles.uniqueColumn}>
            <span className={styles.uniqueLabel} style={{ color: '#2ff801' }}>
              {country2.name.common}
            </span>
            {uniqueLang2.map(lang => (
              <span key={lang} className={styles.uniqueTag}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>SHARED CURRENCIES</div>
        {sharedCurrencies.length > 0 ? (
          <div className={styles.shared}>
            {sharedCurrencies.map(curr => (
              <span key={curr} className={styles.tag}>
                ✓ {curr}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.noData}>NONE DETECTED</div>
        )}
        <div className={styles.uniqueRow}>
          <div className={styles.uniqueColumn}>
            <span className={styles.uniqueLabel} style={{ color: '#00FFD1' }}>
              {country1.name.common}
            </span>
            {uniqueCurr1.map(curr => (
              <span key={curr} className={styles.uniqueTag}>
                {curr}
              </span>
            ))}
          </div>
          <div className={styles.uniqueColumn}>
            <span className={styles.uniqueLabel} style={{ color: '#2ff801' }}>
              {country2.name.common}
            </span>
            {uniqueCurr2.map(curr => (
              <span key={curr} className={styles.uniqueTag}>
                {curr}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>SHARED TIMEZONES</div>
        {sharedTimezones.length > 0 ? (
          <div className={styles.shared}>
            {sharedTimezones.map(tz => (
              <span key={tz} className={styles.tag}>
                ✓ {tz}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.noData}>NONE DETECTED</div>
        )}
        <div className={styles.uniqueRow}>
          <div className={styles.uniqueColumn}>
            <span className={styles.uniqueLabel} style={{ color: '#00FFD1' }}>
              {country1.name.common}
            </span>
            {uniqueTz1.slice(0, 3).map(tz => (
              <span key={tz} className={styles.uniqueTag}>
                {tz}
              </span>
            ))}
          </div>
          <div className={styles.uniqueColumn}>
            <span className={styles.uniqueLabel} style={{ color: '#2ff801' }}>
              {country2.name.common}
            </span>
            {uniqueTz2.slice(0, 3).map(tz => (
              <span key={tz} className={styles.uniqueTag}>
                {tz}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>SHARED BORDERS</div>
        {sharedBorders.length > 0 ? (
          <div className={styles.shared}>
            {sharedBorders.map(border => (
              <span key={border} className={styles.tag}>
                ✓ {border}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.noData}>NONE DETECTED</div>
        )}
      </div>
    </div>
  );
}
