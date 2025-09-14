'use client';
import React, { useEffect, useState } from 'react';
import { payloadClient } from '../lib/payloadClient';

function BlogDetails({ blogId }) {
  const [blogPost, setBlogPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      fetchBlogDetails();
      fetchLatestPosts();
    }
  }, [blogId]);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await payloadClient.getBlogPostById(blogId);
      setBlogPost(response);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestPosts = async () => {
    try {
      const response = await payloadClient.getLatestBlogPosts(3);
      setLatestPosts(response.docs || []);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return { day: '', month: '' };
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toLowerCase()
    };
  };

  if (loading) {
    return (
      <section className="blog section-padding">
        <div className="container">
          <div className="loader">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogPost) {
    return (
      <section className="blog section-padding">
        <div className="container">
          <div className="text-center">
            <h3>Blog post not found</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog section-padding">
      <div className="container">
        <div className="row xlg-marg">
          <div className="col-lg-8">
            <div className="main-post">
              <div className="item pb-60">
                <article>
                  {blogPost.image && (
                    <div className="post-img mb-30">
                      <img src={blogPost.image} alt={blogPost.title || ''} />
                    </div>
                  )}
                  <div className="post-meta mb-30">
                    <span>By: {blogPost.author || 'Admin'}</span>
                    {blogPost.publishDate && (
                      <span className="ml-30">{formatDate(blogPost.publishDate)}</span>
                    )}
                  </div>
                  <h1 className="mb-30">{blogPost.title}</h1>
                  {blogPost.content && (
                    <div 
                      className="post-content"
                      dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />
                  )}
                </article>

                {blogPost.quote && (
                  <div className="post-qoute mt-50">
                    <h6 className="fz-20">
                      <span className="l-block">
                        {blogPost.quote}
                      </span>
                      <span className="sub-title mt-20 mb-0"> - {blogPost.quoteAuthor || 'UiCamp'}</span>
                    </h6>
                  </div>
                )}

                {blogPost.additionalImages && blogPost.additionalImages.length > 0 && (
                  <div className="mb-50 mt-50">
                    <div className="row">
                      {blogPost.additionalImages.slice(0, 2).map((img, index) => (
                        <div key={index} className="col-sm-6">
                          <div className={`iner-img ${index === 0 ? 'sm-mb30' : ''}`}>
                            <img src={img.imageUrl} alt="" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="info-area flex pt-50 bord-thin-top">
                <div>
                  {blogPost.tags && blogPost.tags.length > 0 && (
                    <div className="tags flex">
                      <div className="valign">
                        <span>Tags :</span>
                      </div>
                      <div>
                        {blogPost.tags.map((tagItem, index) => (
                          <a key={index} href="/blog-classic">{tagItem.tag}</a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="ml-auto">
                  <div className="share-icon flex">
                    <div className="valign">
                      <span>Share :</span>
                    </div>
                    <div>
                      <a href="https://www.facebook.com/">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://www.twitter.com/">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://www.youtube.com/">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {blogPost.authorImage && blogPost.authorBio && (
                <div className="author-area mt-50 bord-thin-bottom">
                  <div className="flex">
                    <div className="author-img mr-30">
                      <div className="img">
                        <img
                          src={blogPost.authorImage}
                          alt={blogPost.author || ''}
                          className="circle-img"
                        />
                      </div>
                    </div>
                    <div className="cont valign">
                      <div className="full-width">
                        <h6 className="fw-600 mb-10">{blogPost.author}</h6>
                        <p>{blogPost.authorBio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="comments-from mt-80">
              <div className="mb-60">
                <h3>Leave a comment</h3>
              </div>
              <form id="contact-form" method="post" action="contact.php">
                <div className="messages"></div>
                <div className="controls row">
                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        name="message"
                        placeholder="Message"
                        rows="4"
                        required="required"
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <div className="mt-30">
                        <button type="submit">
                          <span className="text">Post Comment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar">
              <div className="widget">
                <h6 className="title-widget">Search Here</h6>
                <div className="search-box">
                  <input type="text" name="search-post" placeholder="Search" />
                  <span className="icon pe-7s-search"></span>
                </div>
              </div>

              {blogPost.categories && blogPost.categories.length > 0 && (
                <div className="widget catogry">
                  <h6 className="title-widget">Categories</h6>
                  <ul className="rest">
                    {blogPost.categories.map((catItem, index) => (
                      <li key={index}>
                        <span>
                          <a href="/blog-grid-sidebar">{catItem.category}</a>
                        </span>
                        <span className="ml-auto">12</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="widget last-post-thum">
                <h6 className="title-widget">Latest Posts</h6>
                {latestPosts.map((post) => {
                  const dateShort = formatDateShort(post.publishDate);
                  return (
                    <div key={post.id} className="item d-flex align-items-center">
                      <div>
                        <div className="img">
                          <a href={`/blog/${post.slug}`}>
                            <img src={post.image} alt={post.title || ''} />
                            <span className="date">
                              <span>
                                {dateShort.day} / <br /> {dateShort.month}
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="cont">
                        {post.tags && post.tags.length > 0 && (
                          <span className="tag">
                            <a href="/blog-grid-sidebar">{post.tags[0].tag}</a>
                          </span>
                        )}
                        <h6>
                          <a href={`/blog-details/${post.id}`}>
                            {post.title}
                          </a>
                        </h6>
                      </div>
                    </div>
                  );
                })}
              </div>

              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="widget tags">
                  <h6 className="title-widget">Tags</h6>
                  <div>
                    {blogPost.tags.map((tagItem, index) => (
                      <a key={index} href="/blog-grid-sidebar">{tagItem.tag}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;