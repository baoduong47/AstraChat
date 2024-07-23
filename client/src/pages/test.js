//   <h1>
//         Welcome Back, {""}
//         {currentUser ? (
//           <>
//             <PersonIcon
//               style={{ verticalAlign: "middle", marginRight: "8px" }}
//             />
//             {currentUser.firstname} {currentDateTime}
//           </>
//         ) : (
//           "Guest"
//         )}
//       </h1>
//       <h2 className="mt-5">
//         {" "}
//         <PeopleIcon style={{ verticalAlign: "middle", marginRight: "8px" }} />
//         All Users List <LogoutButton />
//       </h2>

//       <ul>
//         {users.map((item) => (
//           <li key={item._id}>
//             {item.firstname} {item.lastname}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h2>Comments</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="comment">Comment:</label>
//             <textarea
//               type="text"
//               id="text"
//               name="text"
//               value={comment}
//               onChange={handleChange}
//               placeholder="Enter a new comment..."
//             />
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//         <ul style={{ listStyleType: "none", padding: 0, marginTop: 10 }}>
//           {comments.map((comment) => (
//             <li
//               key={comment._id}
//               style={{
//                 marginBottom: "16px",
//                 padding: "50px",
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//                 textAlign: "center",
//               }}
//             >
//               <div style={{ marginBottom: "4px" }}>
//                 <PersonIcon
//                   style={{ fontSize: "6rem", color: "#bbb" }}
//                   alt={`${comment.author.firstname}'s avatar`}
//                   key={comment.author.firstname}
//                 />
//                 <strong>{comment.author}</strong>{" "}
//                 <span style={{ color: "#555" }}>
//                   {new Date(comment.createdAt).toLocaleString()}
//                 </span>
//                 <h3>User ID: {comment.postId}</h3>
//                 <h4>Comment ID: {comment._id}</h4>
//               </div>
//               <div>{comment.comment}</div>
//               <button onClick={() => handleDeleteSubmit(comment._id)}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
