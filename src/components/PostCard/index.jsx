import './style.css'

// export const PostCard = ({post}) => {
//     return (
//         <div className='post'>
//             <img src={post.cover} alt={post.title}/>
//             <div className="post-content">
//                 <h1>{post.title}</h1>
//                 <p>{post.body}</p>
//             </div>
//         </div>
//     );
// }

export const PostCard = ({title, cover, body, id}) => (
    <div className='post'>
        <img src={cover} alt={title}/>
        <div className="post-content">
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    </div>
)