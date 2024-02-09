import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from 'components/ui/atoms/Text/Text';

const LegalNotices = () => {
  if (__DEV__) console.log('🏳️ - home');

  return (
    <ScrollView contentContainerStyle={styles.containerlegalnotices}>
      <Text style={styles.legalnoticesmaintitle}>Legal Notices :</Text>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Application Editor :</Text>
        <Text style={styles.legalnoticesdescription}>
          Cronos is published by Cronos ©, a Simplified Joint Stock Company company with a capital
          of 69420€, registered with the Trade and Companies Register of Lyon under number
          6969696969. The registered office is located at 6 Cr de Verdun Rambaud, 69002 Lyon.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Publication Directors :</Text>
        <Text style={styles.legalnoticesdescription}>
          The publication directors of the Cronos application are DURA J., SEREIR N. and VERNET B.,
          acting in the capacity of Chief Executive Officer (CEO).
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Contact :</Text>
        <Text style={styles.legalnoticesdescription}>
          For any questions or complaints regarding the Cronos application, please contact us by
          email at the following address: benjamin.vernet@ynov.com.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Hosting :</Text>
        <Text style={styles.legalnoticesdescription}>
          The Cronos application is hosted by Lyon Ynov Campus, whose registered office is located
          at 6 Cr de Verdun Rambaud, 69002 Lyon.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Intellectual Property :</Text>
        <Text style={styles.legalnoticesdescription}>
          All content present in the Cronos application, including texts, images, logos, graphics,
          videos, trademarks, and interactive elements, are the exclusive property of Cronos © or
          its licensors, and are protected by national and international intellectual property laws.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Personal Data Protection :</Text>
        <Text style={styles.legalnoticesdescription}>
          Cronos collects and processes certain personal data from its users. For more information
          on how we collect, use, and protect your personal data, please refer to our Privacy Policy
          available in the application.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Cookies :</Text>
        <Text style={styles.legalnoticesdescription}>
          The Cronos application uses cookies. For more information on the use of cookies and how to
          disable them, please refer to our Privacy Policy.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Limitation of Liability :</Text>
        <Text style={styles.legalnoticesdescription}>
          The use of the Cronos application is at the user's own risk. The publisher cannot be held
          responsible for direct or indirect, material or immaterial damages resulting from the use
          of the application.
        </Text>
      </View>

      <View style={styles.legalnoticesparagraph}>
        <Text style={styles.legalnoticestitle}>Applicable Law and Jurisdiction :</Text>
        <Text style={styles.legalnoticesdescription}>
          These legal notices are governed and interpreted in accordance with French law. Any
          dispute relating to the Cronos application will be subject to the exclusive jurisdiction
          of the French courts.
        </Text>
      </View>

      <Text style={styles.legalnoticeadvice}>
        These legal notices may be updated at any time. Users are advised to regularly check this
        page to stay informed of any changes.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerlegalnotices: {
    flex: 1,
    padding: 20
  },
  legalnoticesmaintitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  legalnoticesparagraph: {
    marginTop: 16
  },
  legalnoticestitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  legalnoticesdescription: {
    fontSize: 15
  },
  legalnoticeadvice: {
    marginTop: 16,
    fontSize: 15,
    fontStyle: 'italic'
  }
});

export default LegalNotices;