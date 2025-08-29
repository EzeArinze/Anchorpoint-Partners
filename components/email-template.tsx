import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";

interface iAppProps {
  url: string;
  email: string;
  token?: string;
}

const EmailConfirmation = ({ email, url }: iAppProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Confirm your Anchor Point Partners account</Preview>
        <Body className="bg-snow font-sans py-[40px]">
          <Container className="bg-white rounded-[10px] shadow-lg p-[32px] max-w-[600px] mx-auto border border-gray-200">
            <Section>
              {/* Header */}
              <Text className="text-[26px] font-extrabold text-primary mb-[24px]">
                Welcome to Anchor Point Partners
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Hi there 👋,
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px]">
                You’re almost set! Please confirm your email address:{" "}
                <strong className="text-gray-900">{email}</strong>
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[32px]">
                Click the button below to verify your email and activate your
                Anchor Point Partners account.
              </Text>

              {/* CTA Button */}
              <Button
                href={url}
                className="bg-primary hover:bg-primary/30 transition-colors duration-200 text-white px-[28px] py-[14px] rounded-[6px] text-[16px] font-semibold"
              >
                Confirm Email
              </Button>

              {/* Backup Link */}
              <Text className="text-[14px] text-gray-600 mt-[32px] mb-[16px]">
                If the button above doesn’t work, copy and paste this link into
                your browser:
              </Text>

              <Text className="text-[14px] text-ring underline break-all mb-[32px]">
                {url}
              </Text>

              {/* Security Notice */}
              <Text className="text-[14px] text-gray-600">
                If you didn’t sign up for Anchor Point Partners, you can safely
                ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-[40px] pt-[16px] border-t border-gray-200">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                © {new Date().getFullYear()} Anchor Point Partners. All rights
                reserved.
              </Text>
              <Text className="text-[12px] text-gray-400 italic">
                Guiding your investments with trust and expertise.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailConfirmation.PreviewProps = {
  url: "https://anchorpointpartners.com/confirm-email?token=abc123",
  email: "nuelrinz@gmail.com",
};

export default EmailConfirmation;
