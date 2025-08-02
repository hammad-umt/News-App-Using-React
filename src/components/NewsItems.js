import React from 'react';

export default function NewsItems({ title, description, imageUrl, newsUrl, author, publishedAt, source }) {
  const defaultImage =
    'https://media.istockphoto.com/id/157528154/photo/a-stack-of-blank-newspapers-against-a-white-background.jpg?s=1024x1024&w=is&k=20&c=M7EWSfPbWfZb4sYDqvexY-81eaVbRPNUWs95DrQ8M2E=';

  return (
    <div className="card my-3 h-70 w-100 position-relative">
      {/* Source Ribbon */}
      <div
        className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded-start"
        style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
      >
        {source || 'Unknown'}
      </div>

      <img
        src={imageUrl || defaultImage}
        className="card-img-top"
        alt="News"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>

        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-auto"
        >
          Read More
        </a>
      </div>

      <figcaption className="blockquote-footer text-center">
        By {author || 'Unknown'}{' '}
        <cite title="Source Title">
          On {publishedAt ? publishedAt.slice(0, 10) : 'Unknown Date'}
        </cite>
      </figcaption>
    </div>
  );
}
