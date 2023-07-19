import { FC } from 'react';
import { Card } from './StatsCard.styled';
import Text from '../styles/Text';
import Box from '../styles/Box';

export interface StatsCardProps {
  title: string;
  subtitle: string;
  titleCategory?: string;
}

export const StatsCard: FC<StatsCardProps> = ({ title, subtitle, titleCategory }) => {
  return (
    <Card>
      <Box display={'flex'} justifyContent={'center'} alignItems={'flex-end'}>
        <Text fontWeight="700" fontSize="3rem" lineHeight="26px" textAlign="center">
          {title}
        </Text>
        {titleCategory && (
          <Text fontWeight="500" fontSize="1.5rem" textAlign="center" style={{ marginLeft: '5px'}}>
            {titleCategory}
          </Text>
        )}
      </Box>
      <Text fontWeight="500" fontSize="1rem" textAlign="center">
        {subtitle}
      </Text>
    </Card>
  );
};
