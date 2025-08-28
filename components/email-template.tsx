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
        <Preview>
          Confirm your email address to complete your registration
        </Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-[24px]">
                Confirm Your Email Address
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Hi there!
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px]">
                We received a request to verify your email address:{" "}
                <strong>{email}</strong>
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[32px]">
                Please click the button below to confirm your email address and
                complete your registration.
              </Text>

              <Button
                href={url}
                className="bg-teal-600 text-white px-[24px] py-[12px] rounded-[6px] text-[16px] font-medium box-border"
              >
                Confirm Email Address
              </Button>

              <Text className="text-[14px] text-gray-600 mt-[32px] mb-[16px]">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className="text-[14px] text-teal-600 break-all mb-[32px]">
                {url}
              </Text>

              <Text className="text-[14px] text-gray-600">
                If you didn&apos;t request this email, you can safely ignore it.
              </Text>
            </Section>

            <Section className="mt-[38px] pt-[16px] border-t border-gray-200">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                © 2025 Universal Prime Capital. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailConfirmation.PreviewProps = {
  url: "https://example.com/confirm-email?token=abc123",
  email: "nuelrinz@gmail.com",
};

export default EmailConfirmation;
