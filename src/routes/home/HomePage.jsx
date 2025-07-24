import NewReviewButton from "../../features/reviews/NewReviewButton"
import ReviewList from "../../features/reviews/ReviewList"
import styles from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div className={`${styles["home-layout"]} page flex-center`}>
      <div className={`flex-center ${styles["post-review"]}`}>
        <NewReviewButton />
      </div>
      <ReviewList />
    </div>
  )
}

export default HomePage
