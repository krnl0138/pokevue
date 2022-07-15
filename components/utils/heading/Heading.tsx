import styles from "./Heading.module.scss";

export const Heading = ({ title }: { title: string }) => {
  return <h2 className={styles.header}>{title}</h2>;
};
