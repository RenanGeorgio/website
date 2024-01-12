import React from 'react';
import Slider from 'react-slick';
import styles from '../styles/homepage.module.css'; 

const HomePage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.menu}>
        <ul>
          <li>Inicio</li>
          <li>Serviços</li>
          <li>O que fazemos</li>
          <li>Entre em contato</li>
          <li>Blog</li>
          <li>Loja</li>
        </ul>
      </div>
      <Slider {...settings} className={styles.carousel}>
        <div className={styles.carouselItem}>Imagem 1</div>
        <div className={styles.carouselItem}>Imagem 2</div>
        <div className={styles.carouselItem}>Imagem 3</div>
        <div className={styles.carouselItem}>Imagem 4</div>
      </Slider>
      <div className={styles.aboutUs}>
        <div className={styles.blackBackground}>
          <div className={styles.yellowBox}>
            <h2>SOBRE NÓS</h2>
            <p>
              Nascemos com a missão de agregar valor a toda cadeia produtiva, levando a "revolução 4.0"
              a todos os quatro cantos do país. Buscando revolucionar a forma de pensar e produzir,
              sempre com um olhar para o futuro, procurando novas soluções que possam contribuir
              de forma positiva para a indústria e a sociedade civil.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.ourServices}>
        <h2>Nossos Serviços</h2>
      </div>
    </div>
  );
};

export default HomePage;
