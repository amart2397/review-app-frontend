import ReviewList from "../features/reviews/ReviewList"
import styles from "./Home.module.css"

const HomePage = () => {
  return (
    <div className={`${styles.page} flex-center`}>
      <ReviewList />
    </div>
  )
}

export default HomePage
