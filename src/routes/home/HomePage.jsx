import NewReviewButton from "../../features/reviews/NewReviewButton"
import ReviewList from "../../features/reviews/ReviewList"
import { useAppStore } from "../../stores/useAppStore"
import styles from "./HomePage.module.css"

const HomePage = () => {
  const user = useAppStore((s) => s.user)

  return (
    <div className={`${styles["home-layout"]} page`}>
      <div className={`flex-center page-component ${styles["post-review"]}`}>
        {user ? <NewReviewButton /> : <p>Please Log In To Post</p>}
      </div>
      <div className={`flex-column page-component ${styles["review-list"]}`}>
        <ReviewList />
      </div>
    </div>
  )
}

export default HomePage
