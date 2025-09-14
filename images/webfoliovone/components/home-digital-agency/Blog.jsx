import React, { useEffect, useState } from 'react';
import { payloadClient } from '../lib/payloadClient';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await payloadClient.getBlogPosts(1, 3);
      setBlogPosts(response.docs);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="blog style2">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center">
            <div>
              <span className="sub-title main-color mb-5">Our Blogs</span>
              <h3 className="fw-600 fz-50 text-u d-rotate wow">
                <span className="rotate-text">
                  Latest <span className="fw-200">News.</span>
                </span>
              </h3>
            </div>
            <div className="ml-auto vi-more">
              <a
                href="/blog-grid-sidebar"
                className="butn butn-sm butn-bord radius-30"
              >
                <span>View All</span>
              </a>
              <span className="icon ti-arrow-top-right"></span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="row">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="col-lg-4">
                <div className={`item ${index < blogPosts.length - 1 ? 'md-mb50' : ''}`}>
                  <div className="info sub-title p-color d-flex align-items-center mb-20">
                    <div>
                      <a href={post.blogGridLink}>By : {post.author}</a>
                    </div>
                    <div className="ml-30">
                      <a href={post.blogGridLink}>{formatDate(post.publishDate)}</a>
                    </div>
                  </div>
                  <div className="img fit-img">
                    <img 
                      src={`${process.env.VITE_PAYLOAD_URL}${post.image?.url}`} 
                      alt={post.image?.alt || post.title} 
                    />
                  </div>
                  <div className="cont pt-30">
                    <h5>{post.title}</h5>
                    <a
                      href={post.blogDetailsLink}
                      className="butn-crev d-flex align-items-center mt-30"
                    >
                      <span className="hover-this">
                        <span className="circle hover-anim">
                          <i className="ti-arrow-top-right"></i>
                        </span>
                      </span>
                      <span className="text">Read more</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;