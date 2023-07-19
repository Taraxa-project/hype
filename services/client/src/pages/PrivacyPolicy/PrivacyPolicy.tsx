import styled from 'styled-components';
import Box from '../../components/styles/Box';
import Text from '../../components/styles/Text';

const TitleText = styled.h1`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.625rem;
  letter-spacing: -0.02em;
  color: #000000;
`;

const Subtitle = styled.h2`
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.625rem;
  letter-spacing: -0.02em;
  color: #000000;
`;

export const PrivacyPolicy = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="greys.1"
      p="1rem 2rem"
      borderRadius="10px"
    >
      <TitleText>Privacy Policy</TitleText>
      <Text>Last updated: May 19, 2023</Text>
      <Text>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or interact with <strong>https://gethyped.app</strong> (the "Site").</Text>

      <Subtitle>Personal information we collect</Subtitle>
      <Text>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”</Text>
      <Text>We collect Device Information using the following technologies:</Text>
      <ul>
        <li><strong>Cookies</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noreferrer">http://www.allaboutcookies.org</a>.</li>
        <li><strong>Log files</strong> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
        <li><strong>Web beacons</strong>, <strong>tags</strong>, and <strong>pixels</strong> are electronic files used to record information about how you browse the Site.</li>
      </ul>
      <Text>Additionally when register on the Site, we collect certain information from you, including your Wallet Address, Telegram username and Telegram user ID. We refer to this information as "User Information."</Text>
      <Text>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and User Information.</Text>

      <Subtitle>How do we use your personal information</Subtitle>
      <Text>We use the User Information that we collect generally to give out rewards through the Site (including associating your Telegram username or Telegram user ID to your Wallet Address). Additionally, we use this User Information to:</Text>
      <Text>Communicate with you;</Text>
      <Text>Screen our submissions for potential risk or fraud; and</Text>
      <Text>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</Text>
      <Text>We use the Device Information that we collect to help us screen for potential risk and fraud, and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</Text>

      <Subtitle>Sharing your personal information</Subtitle>
      <Text>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example we also use Google Analytics to help us understand how our customers use the Site - you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">https://tools.google.com/dlpage/gaoptout</a>.</Text>
      <Text>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</Text>

      <Subtitle>Do not track</Subtitle>
      <Text>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</Text>

      <Subtitle>Your rights</Subtitle>
      <Text>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</Text>
      <Text>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an account through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</Text>

      <Subtitle>Data Retention</Subtitle>
      <Text>When you sign up for an account through the Site, we will maintain your User Information for our records unless and until you ask us to delete this information.</Text>

      <Subtitle>Minors</Subtitle>
      <Text>The Site is not intended for individuals under the age of 18.</Text>

      <Subtitle>Changes</Subtitle>
      <Text>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</Text>

      <Subtitle>Contact Us</Subtitle>
      <Text>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <strong>contact@gethyped.app</strong></Text>
    </Box>
  );
};
