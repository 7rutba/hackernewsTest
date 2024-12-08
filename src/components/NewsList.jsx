import React from "react";

const NewsList = ({ newsData }) => {
  const calculateTimeAgo = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - givenDate;

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="p-4">
      {newsData.map((item, index) => (
        <div key={index} className="">
          <h2 className="  items-center gap-2 text-gray-500">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex line-clamp-2 justify-start gap-2 "
            >
              <p className="text-black"> {item.title}</p>
              <p className="hover:underline"> ({item.url})</p>
            </a>
          </h2>
          <div className="flex gap-4">
            <a
              href={item.url}
              className="text-gray-400 mb-1 text-xs hover:underline"
            >
              {item.points || 0} points |
            </a>
            <a
              href={item.url}
              className="text-gray-400 mb-1 text-xs hover:underline"
            >
              {item.author || "Unknown"} |
            </a>
            <a
              href={item.url}
              className="text-gray-400 mb-1 text-xs hover:underline"
            >
              {calculateTimeAgo(item.created_at)} |
            </a>
            <a
              href={item.url}
              className="text-gray-400 mb-1 text-xs hover:underline"
            >
              {item?.children?.length || 0} comments
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
const Comment = ({ comment }) => (
  <div className="ml-6 mt-4 border-l pl-4">
    <p className="text-gray-700 mb-1">
      <strong>{comment.author}:</strong>{" "}
      <span
        dangerouslySetInnerHTML={{ __html: comment.text }}
        className="text-gray-600"
      />
    </p>
    {comment.children &&
      comment.children.map((child) => (
        <Comment key={child.id} comment={child} />
      ))}
  </div>
);
