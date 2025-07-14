import ReviewList from "../../features/reviews/ReviewList"
import styles from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div className={`${styles.page} page flex-center`}>
      <ReviewList />
    </div>
  )
}

export default HomePage
