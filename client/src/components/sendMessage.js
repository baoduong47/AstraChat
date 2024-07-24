import React from "react";
import { useSelector } from "react-redux";

const SendMessage = () => {
  const { users, loading, error } = useSelector((state) => state.user);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!users) {
    return <p>User not found</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Send Message</h2>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="recipientId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Recipient's Name:
          </label>
          <select
            id="recipientId"
            name="recipientId"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Select a recipient</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="message"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
