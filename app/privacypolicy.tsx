import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from 'components/ui/atoms/Text/Text';

const PrivacyPolicy = () => {
  if (__DEV__) console.log('📜 - Privacy Policy');

  return (
    <ScrollView contentContainerStyle={styles.containerprivacy}>
      <Text style={styles.privacymaintitle}>Privacy Policy</Text>
      <Text style={styles.privacyintroduction}>
        This Privacy Policy outlines how Cronos collects, uses, maintains, and discloses information
        collected from users of the Cronos mobile application.
      </Text>
      <View style={styles.privacyparagraph}>
        <Text style={styles.privacytitle}>Information Collection and Use :</Text>
        <Text style={styles.privacydescription}>
          We may collect personal identification information from Users in various ways, including,
          but not limited to, when Users visit our App, register on the App, fill out a form, and in
          connection with other activities, services, features, or resources we make available on
          our App. Users may be asked for, as appropriate, name, email address, and other contact
          information. We will collect personal identification information from Users only if they
          voluntarily submit such information to us. Users can always refuse to supply personally
          identification information, except that it may prevent them from engaging in certain
          App-related activities.
        </Text>
      </View>

      <View style={styles.privacyparagraph}>
        <Text style={styles.privacytitle}>How We Use Collected Information :</Text>
        <View style={styles.privacydescriptioncontainer}>
          <Text style={styles.privacydescription}>
            Cronos aims to revolutionize online communication by cultivating awareness of the
            ephemeral nature of interactions while ensuring a secure, authentic, and responsible
            user experience. We collect and use Users' personal information for the following
            purposes:
          </Text>
          <Text style={styles.privacypurpose}>
            <Text style={styles.privacypurposetitle}>Temporary Publications :</Text> Cronos
            integrates a feature allowing posts to have a defined lifespan, encouraging users to be
            mindful of the speed and ephemerality of interactions.
          </Text>
          <Text style={styles.privacypurpose}>
            <Text style={styles.privacypurposetitle}>Enhanced Security :</Text> We reinforce
            security principles to optimally protect users' personal data and integrity.
          </Text>
          <Text style={styles.privacypurpose}>
            <Text style={styles.privacypurposetitle}>Innovative Discussions :</Text> Cronos enhances
            communication methods between users to foster more authentic and meaningful interaction.
          </Text>
          <Text style={styles.privacypurpose}>
            <Text style={styles.privacypurposetitle}>Combatting Disinformation :</Text> We establish
            a procedure for verifying posts by administrators or the community to prevent the spread
            of false information.
          </Text>
          <Text style={styles.privacypurpose}>
            <Text style={styles.privacypurposetitle}>Prevention of Cyberbullying :</Text> Cronos
            implements a user rating system to identify and manage abusive behaviors and provides
            security cores offering assistance and support to users affected by cyberbullying.
          </Text>
        </View>
      </View>

      <View style={styles.privacyparagraph}>
        <Text style={styles.privacytitle}>Changes to this Privacy Policy :</Text>
        <Text style={styles.privacydescription}>
          Cronos has the discretion to update this privacy policy at any time. When we do, we will
          revise the updated date at the bottom of this page. We encourage users to frequently check
          this page for any changes to stay informed about how we are helping to protect the
          personal information we collect. You acknowledge and agree that it is your responsibility
          to review this privacy policy periodically and become aware of modifications.
        </Text>
      </View>

      <View style={styles.privacyparagraph}>
        <Text style={styles.privacytitle}>Your Acceptance of These Terms :</Text>
        <Text style={styles.privacydescription}>
          By using this App, you signify your acceptance of this policy. If you do not agree to this
          policy, please do not use our App. Your continued use of the App following the posting of
          changes to this policy will be deemed your acceptance of those changes.
        </Text>
      </View>

      <View style={styles.privacyparagraph}>
        <Text style={styles.privacytitle}>Contacting Us :</Text>
        <Text style={styles.privacydescription}>
          If you have any questions about this Privacy Policy, the practices of this App, or your
          dealings with this App, please contact us at benjamin.vernet@ynov.com.
        </Text>
      </View>

      <Text style={styles.privacyadvice}>This document was last updated on 09/02/2024.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerprivacy: {
    flex: 1,
    padding: 20
  },
  privacymaintitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  privacyintroduction: {
    marginTop: 16,
    fontSize: 15
  },
  privacyparagraph: {
    marginTop: 16
  },
  privacytitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  privacydescriptioncontainer: {},
  privacydescription: {
    fontSize: 15
  },
  privacypurpose: {
    fontSize: 15,
    marginTop: 8
  },
  privacypurposetitle: {
    fontWeight: 'bold'
  },
  privacyadvice: {
    marginTop: 16,
    fontSize: 15,
    fontStyle: 'italic'
  }
});

export default PrivacyPolicy;
