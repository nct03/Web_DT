import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "10 Mẹo Để Tận Dụng Tối Đa Điện Thoại Samsung Của Bạn",
            excerpt: "Khám phá các mẹo và thủ thuật thiết yếu để nâng cao trải nghiệm sử dụng điện thoại Samsung của bạn.",
            image: "https://au2-images.shop.samsung.com/medias/Banner-2000x600-3E-1-.jpg?context=bWFzdGVyfGltYWdlc3w1Nzg5NDd8aW1hZ2UvanBlZ3xpbWFnZXMvaDMzL2hlNS85MjUxODM4ODUzMTUwLmpwZ3wzNGI5ZmYxZjU3ZWViMjIzNDg5YzI1NTM5MzkyOGRmYzQ3MzFmOGJkODk1YWE5OWM5MDJkOTRmOTQ1MDg3NTA1",
            date: "25 Tháng Tám, 2024"
        },
        {
            id: 2,
            title: "Top 5 Điện Thoại Samsung Đáng Xem Trong Năm 2024",
            excerpt: "Khám phá những điện thoại Samsung mới nhất đang gây ấn tượng trong năm nay.",
            image: "https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg",
            date: "22 Tháng Tám, 2024"
        },
        {
            id: 3,
            title: "Cách Tối Ưu Hóa Hiệu Suất Điện Thoại Samsung Của Bạn",
            excerpt: "Học cách cải thiện hiệu suất và tốc độ của điện thoại Samsung của bạn với các bước đơn giản này.",
            image: "https://au2-images.shop.samsung.com/medias/Banner-2000x600-3E-1-.jpg?context=bWFzdGVyfGltYWdlc3w1Nzg5NDd8aW1hZ2UvanBlZ3xpbWFnZXMvaDMzL2hlNS85MjUxODM4ODUzMTUwLmpwZ3wzNGI5ZmYxZjU3ZWViMjIzNDg5YzI1NTM5MzkyOGRmYzQ3MzFmOGJkODk1YWE5OWM5MDJkOTRmOTQ1MDg3NTA1",
            date: "20 Tháng Tám, 2024"
        }
    ];

    return (
        <div>
            <Header />
            <div className="row mx-0" style={{ marginTop: "117px" }}>
                <div className="px-0 image-container" style={{ height: "400px" }}>
                    <img
                        src="https://au2-images.shop.samsung.com/medias/Banner-2000x600-3E-1-.jpg?context=bWFzdGVyfGltYWdlc3w1Nzg5NDd8aW1hZ2UvanBlZ3xpbWFnZXMvaDMzL2hlNS85MjUxODM4ODUzMTUwLmpwZ3wzNGI5ZmYxZjU3ZWViMjIzNDg5YzI1NTM5MzkyOGRmYzQ3MzFmOGJkODk1YWE5OWM5MDJkOTRmOTQ1MDg3NTA1"
                        width={"100%"}
                        height={"100%"}
                        alt="Blog Banner"
                    />
                </div>
            </div>

            <div className="container mb-5">
                <div className="row mx-0 px-5 py-3">
                    <div className="col-12 text-secondary py-5">
                        <div>
                            <h4 style={{ textAlign: "center" }}>Tin Tức & Blog</h4>
                        </div>
                        <hr />

                        <div className="row">
                            {blogPosts.map(post => (
                                <div key={post.id} className="col-md-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={post.image}
                                            className="card-img-top"
                                            alt={post.title}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.excerpt}</p>
                                            <a href={`/blog/${post.id}`} className="btn btn-primary">
                                                Đọc thêm
                                            </a>
                                        </div>
                                        <div className="card-footer text-muted">
                                            {post.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
