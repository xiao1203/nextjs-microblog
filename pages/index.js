import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';

import Link from 'next/link';
import utilStyle from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';

//SSGの場合
export async function getStaticProps() {
  const allPostData = getPostsData();
  // console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}

export default function Home({ allPostData }) {
  return (
    <Layout>
      <section className={utilStyle.headingMd}>
        <p>next.jsで作った簡易ブログ</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>🗒エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostData.map(({ id, title, data, thumbnail }) => (
            <article key={id}>
              <Link legacyBehavior href={`/post/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link legacyBehavior href={`/post/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{data}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
