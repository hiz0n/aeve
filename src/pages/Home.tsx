import VideoSlider from "../com/VideoSlider";
import styles from "./Home.module.scss";

const Home = () => {
  let slide = [
    {
      src: "/aeve/mov/video01_new.mp4",
      title: "Time Flows, Beauty Remains",
      subtitle: "시간이 흘러도 변하지 않는 미가 있습니다.",
    },
    {
      src: "/aeve/mov/video02_new.mp4",
      title: "Woven by Nature",
      subtitle: "자연이 엮어낸 시간, 피부에 닿는 순수함.",
    },
    {
      src: "/aeve/mov/video03_new.mp4",
      title: "The Season of You",
      subtitle: "계절이 변해도, 당신의 아름다움은 이곳에 머뭅니다.",
    },
  ];

  return (
    <div className={styles.home}>
      <div className={styles.sb}></div>
      <VideoSlider slides={slide} />
    </div>
  );
};

export default Home;
