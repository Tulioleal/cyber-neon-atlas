'use client';

import Image from 'next/image';
import { Country } from '@/types/country';
import { colorsWithAlpha } from '@/utils/colors';
import styles from './CountryPanel.module.scss';
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';

interface CountryPanelProps {
  country: Country | null;
  variant: 'primary' | 'secondary';
  idSuffix?: string;
}

type AnimationProps = HTMLMotionProps<"div">

export default function CountryPanel({
  country,
  variant,
  idSuffix = 'PENDING',
}: CountryPanelProps) {
  const isPrimary = variant === 'primary';
  const borderColor = isPrimary
    ? colorsWithAlpha.primary(0.3)
    : colorsWithAlpha.secondary(0.3);
  const valueClass = isPrimary ? styles.statValue : styles.statValueSecondary;

  const containerAnimationProps:AnimationProps = {
    exit:{
      backgroundColor: [
        colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.1),
        colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.5),
        colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.1),
        colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.35),
        colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0),
      ]
      
    },
    transition:{
      duration: 0.5,
      times: [0, 0.2, 0.4, 0.6, 1]
    },
  }

  const contentAnimationProps:AnimationProps = {
    initial:{ opacity: 0 },
    animate:{ opacity: 1 },
    exit:{ opacity: 0 },
    transition:{ duration: 0.1, ease: "anticipate" },
  }

  return (
    <div
      className={styles.countryPanel}
      style={{
        borderColor,
        textAlign: isPrimary ? 'left' : 'right',
      }}
    >
      <AnimatePresence mode="wait">
        {
          !country ? (
            <motion.div key={`placeholder_${idSuffix}`}
              {...containerAnimationProps}
              className={styles.container}
            >
              <motion.div {...contentAnimationProps} >
                <div className={styles.countryId}>ID: {idSuffix}</div>
                <div
                  className={styles.stats}
                  style={{ textAlign: isPrimary ? 'left' : 'right' }}
                  >
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>STATUS</span>
                    <span className={valueClass}>AWAITING DATA</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key={country.cca3}
              {...containerAnimationProps}
              className={styles.container}
            >
              <motion.div {...contentAnimationProps} >
                <div className={styles.countryId}>
                  ID: {country.cca3}_{idSuffix}
                </div>
                <div
                  className={styles.countryHeader}
                  style={{ flexDirection: isPrimary ? 'row' : 'row-reverse' }}
                >
                  <div>
                    <Image
                      src={country.flags.png}
                      alt={`${country.name.common} flag`}
                      width={64}
                      height={48}
                      className={styles.flag}
                    />
                    <h2
                      className={
                        isPrimary ? styles.countryName : styles.countryNameSecondary
                      }
                    >
                      {country.name.official}
                    </h2>
                    <p className={isPrimary ? styles.coords : styles.coordsSecondary}>
                      {country.capitalInfo?.latlng
                        ? `${country.capitalInfo.latlng[0]}° N, ${country.capitalInfo.latlng[1]}° E`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div
                  className={styles.stats}
                  style={{ textAlign: isPrimary ? 'left' : 'right' }}
                >
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>CAPITAL</span>
                    <span className={valueClass}>{country.capital?.[0] || 'N/A'}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>REGION</span>
                    <span className={valueClass}>{country.region || 'N/A'}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>POPULATION</span>
                    <span className={valueClass}>
                      {country.population.toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>AREA</span>
                    <span className={valueClass}>
                      {(country.area || 0).toLocaleString()} km²
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
}
