import Link from 'next/link';
import Image from 'next/image';
import { Country } from '@/types/country';
import styles from './CountryCard.module.scss';
import { motion } from 'motion/react';
import { colors, colorsWithAlpha } from '@/utils/colors';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const population = country.population?.toLocaleString() || 'N/A';
  const region = country.region || 'Unknown';
  const capital = country.capital?.[0] || 'N/A';

  return (
    <motion.div key={country.cca3} className={styles.card}
      initial={{
        boxShadow: `0 0 15px ${colorsWithAlpha.primary(0.5)}`,
        translateY: 10,
      }}
      animate={{ background: colors.surfaceBright, boxShadow: 'none', translateY: 0 }}
      exit={{ 
        opacity: 0,
        animationDuration: 0.1,
        transition: { duration: 0.1, ease: "easeOut" },
      }}
      whileHover={{
        background: colors.surfaceContainerHighest,
        boxShadow: `0 0 15px  ${colorsWithAlpha.primary(0.3)}`,
        translateY: -2,
      }}
      transition={{ duration: 0.3, ease: "anticipate" }}
    >
      <Link href={`/country/${country.cca3}`}>
        <div className={styles.flag}>
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            width={60}
            height={40}
            unoptimized
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{country.name.common}</h3>
          <div className={styles.meta}>
            <span className={styles.region}>{region}</span>
            <span className={styles.capital}>{capital}</span>
          </div>
          <span className={styles.population}>{population}</span>
        </div>
      </Link>
    </motion.div>
  );
}
