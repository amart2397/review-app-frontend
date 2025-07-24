import NewReviewButton from "../../features/reviews/NewReviewButton"
import ReviewList from "../../features/reviews/ReviewList"
import styles from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div className={`${styles["home-layout"]} page flex-center`}>
      <div className={`flex-center page-component ${styles["post-review"]}`}>
        <NewReviewButton />
      </div>
      <div className={`flex-column page-component ${styles["review-list"]}`}>
        <ReviewList />
      </div>
    </div>
  )
}

export default HomePage
