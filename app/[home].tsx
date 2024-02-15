import React from 'react';
import { ScrollView } from 'react-native';
import PostTemplate from './posttemplate';
import IMAGES from 'constants/Images';

const Home = () => {
    if (__DEV__) console.log('HOME');

    return (
        <>
            <ScrollView>
                <PostTemplate
                    username="Adele.Johnson36"
                    date="2:45:32"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    imageUrl={IMAGES.profileimage}
                    postId={1}
                />
                <PostTemplate
                    username="Macron Calvitie"
                    date="4:20:00"
                    description="Le président de la république a été aperçu dans un bar à chicha à Paris. Il aurait été vu en train de fumer du cannabis."
                    imageUrl={IMAGES.macron}
                    postId={2}
                />
                <PostTemplate
                    username="FeetLover"
                    date="3:58:29"
                    description="Feet pics for sale, 10€ each. DM me for more info."
                    imageUrl={IMAGES.test}
                    postId={3}
                />
                <PostTemplate
                    username="ADMIN"
                    date="1:18:29"
                    description="Please stop posting feet pics, it's not allowed on this platform."
                    imageUrl={IMAGES.logo}
                    postId={4}
                />
                <PostTemplate
                    username="François Hollande"
                    date="6:00:00"
                    description="J'aime les yaourts à la fraise."
                    imageUrl={IMAGES.profilecroneur}
                    postId={5}
                />
            </ScrollView>
        </>
    );
};

export default Home;
