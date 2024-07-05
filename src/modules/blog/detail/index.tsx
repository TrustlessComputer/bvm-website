'use client'

import s from './styles.module.scss';
import Socials from '@/modules/blog/detail/Socials';
import Tags from '@/modules/blog/detail/Tags';
import { IBlog } from '@/types/blog';
import Image from 'next/image';
import ImagePlaceholder from '@components/ImagePlaceholder';

export default function BLogDetail(props: IBlog) {
  const { content, title, thumbnail } = props;

  return (
    <div className={`${s.logDetail}`}>
      <div className="main containerV3">
        <div className={s.top}>
          <div className={s.thumnail}>
            {/*<ImagePlaceholder src={thumbnail} alt={title} width={980} height={550} />*/}
            <ImagePlaceholder src={'/images/banner.png'} alt={title} width={980} height={300} />
          </div>
          <div className={s.heading}>
            <p className={s.heading_text}>Garden Shed Interior Design Ideas for Every Style and Need
            </p>
            <p className={s.heading_author}>3700 | Jul 3, 2024</p>
            <div className={s.divider}></div>
            <Socials {...props} />
          </div>
        </div>

        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: content }}
        >
          <h2>1. Heading</h2>
          <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dicta distinctio ducimus eos error exercitationem explicabo facilis fuga inventore modi mollitia non officiis perspiciatis quibusdam quis quo quod, repudiandae sequi.</span><span>Adipisci animi at doloribus libero nulla perspiciatis reiciendis unde vero voluptas voluptatem! Corporis dignissimos eaque enim quis temporibus. Aspernatur atque harum laboriosam, perspiciatis placeat quisquam. Harum maxime neque quae sunt.</span><span>Ad dicta ducimus hic illo in laboriosam maiores molestias nam obcaecati porro, possimus quam qui quo ratione rem soluta totam? Delectus dicta iusto, labore maiores minus odit provident vel voluptas.</span><span>Architecto consectetur culpa cum et eum id in laborum, molestiae odio odit optio sint tenetur, ut vel voluptates? Ab atque consequatur culpa dicta dignissimos enim illum quis sed ullam vel!</span><span>Autem dolor dolores eligendi facere fuga iste itaque neque non provident quaerat qui, quis quo repellat vel voluptates! Facilis incidunt iusto officiis repellendus sint. At beatae error explicabo quae quam.</span><span>Alias consequatur dolorum facere facilis maiores neque quam repellat sapiente. Aliquam deleniti dolorem ducimus excepturi expedita, illo laborum maiores minima obcaecati odio officiis optio porro sequi sint, suscipit vero vitae.</span><span>At expedita nulla officia. Cum minus quisquam repellat temporibus. Dignissimos, nisi quae? Animi dolor ducimus illo natus nobis omnis, praesentium quidem sed sequi sit? Eaque inventore placeat quaerat quas quasi.</span><span>Aliquam cum cumque esse eveniet facilis maxime omnis quos rerum velit veritatis! Harum nobis quia quod. A beatae dignissimos dolorem, eaque, fuga harum incidunt libero natus necessitatibus quibusdam, rem velit.</span><span>Asperiores consectetur, dolore error, est et eveniet ex incidunt, labore nisi nobis optio quaerat quas qui quidem tempore vitae voluptate voluptatum. Amet consectetur doloremque maiores, nisi numquam obcaecati qui suscipit!</span><span>Aspernatur consequatur earum eius eos error incidunt, inventore magni maxime mollitia nobis quod ratione, repudiandae rerum sequi sint ut velit voluptas, voluptatem! Ab delectus facere, illum minima odio quam voluptatem?</span><span>A ad, asperiores aspernatur dolorem eligendi eos error eveniet exercitationem facere id laboriosam nam nemo odit perspiciatis porro quam quod recusandae saepe sed totam, unde ut vel vero vitae voluptate.</span><span>Ab accusantium commodi dolor dolorem ducimus eaque esse inventore magnam maiores, minima nobis, porro quas quia, quod sit tempore vitae! Accusamus animi eius esse illo necessitatibus non pariatur perferendis velit.</span><span>Accusamus aliquam aperiam commodi culpa cupiditate deserunt error eum inventore modi odio pariatur perspiciatis possimus quaerat quisquam quos recusandae, rem, similique sint sunt totam velit vero voluptatem voluptatibus? Eligendi, impedit.</span></p>
        </div>
        <div className="auth"></div>
        <div className={s.meta}>
           <Tags />
          <Socials {...props} />
        </div>

      </div>
    </div>
  );
}
