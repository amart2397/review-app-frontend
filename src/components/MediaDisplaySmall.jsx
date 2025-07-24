import styles from "./MediaDisplaySmall.module.css"

const MediaDisplaySmall = ({ data }) => {
  return (
    <div className={styles["media-data"]}>
      <img
        src={data.imgSmall ? data.imgSmall : "https://picsum.photos/200/300"}
        alt="result cover art"
      />
      <div className={styles["media-text"]}>
        <h3>{data.title}</h3>
        <p>
          {data.mediaType === "book"
            ? data.authors
            : data.releaseDate?.slice(0, 4)}
        </p>
      </div>
    </div>
  )
}

export default MediaDisplaySmall
