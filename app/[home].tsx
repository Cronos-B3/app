import { ScrollView } from 'react-native';
import Test from "./test";

export default () => {
    if (__DEV__) console.log('HOME');

    return (
        <>
            <ScrollView>
                <Test />
                <Test />
                <Test />
                <Test />
            </ScrollView>
        </>
    );
};

