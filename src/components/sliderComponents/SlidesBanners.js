import styles from "./slidesBanner.module.css";

function SlidesBanners(props) {
  return (
    <div className={styles.bannerContainer}>
      <h3 className={styles.topText}>{props.topText} </h3>
      {/* <br /> */}
      <h3 className={styles.bottomText}>{props.bottomText}</h3>
    </div>
  );
}

export default SlidesBanners;
