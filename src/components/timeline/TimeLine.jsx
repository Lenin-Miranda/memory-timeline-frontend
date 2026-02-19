import "./Timeline.css";


export default function TimeLine() {
    const [posts, setPosts] = useState([
      {
        id: 1,
        date: "14th Jan 2025",
        image: "",
        caption: "Add Caption",
      },
      {
        id: 2,
        date: "9th Mar 2025",
        image: "",
        caption: "Add Caption",
      },
      {
        id: 3,
        date: "21st May 2025",
        image: "",
        caption: "Add Caption",
      },
    ]);

  return (
    <div className="timeline-container">
      <h1>Timeline</h1>
      {posts.map((post) => (
        <div key={post.id} className="timeline-post">
          <p className="timeline-date">{post.date}</p>
          <img src={post.image} alt={post.caption} className="timeline-image" />
          <p className="timeline-caption">{post.caption}</p>
        </div>
      ))}
    </div>
  )
}

// --- The timeline page, started to use the post method. Just have to add photos to assets finilize the function and style ---