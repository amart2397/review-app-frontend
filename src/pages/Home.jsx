import ReviewList from "../features/reviews/ReviewList"
import styles from "./Home.module.css"

const HomePage = () => {
  return (
    <div className={styles.page}>
      <ReviewList />
    </div>
  )
}

export default HomePage
