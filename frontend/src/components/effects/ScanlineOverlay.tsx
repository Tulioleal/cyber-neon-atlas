import styles from './ScanlineOverlay.module.scss';

interface ScanlineOverlayProps {
  opacity?: number;
}

export default function ScanlineOverlay({
  opacity = 0.03,
}: ScanlineOverlayProps) {
  return (
    <div className={styles.scanlines} style={{ opacity }} aria-hidden="true" />
  );
}
