import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddHypePool } from '../../../models';
import { useAuth } from '../../../hooks/useAuth';

export interface HypePoolDetailsForm
  extends Pick<
    AddHypePool,
    'title' | 'projectName' | 'tokenName' | 'description' | 'projectDescription' | 'campaignWord'
  > {}

export const useDetailsFormEffects = (defaultValues: HypePoolDetailsForm) => {
  const { authenticated } = useAuth();

  const validationSchema = yup
    .object({
      title: yup.string().required('Title is required').label('Title'),
      projectName: yup.string().required('Project name is required').label('Project name'),
      tokenName: yup.string().optional().label('Project token name'),
      description: yup
        .string()
        .required('Description is required')
        .label('Project description')
        .max(280),
      projectDescription: yup
        .string()
        .required('Hype description is required')
        .label('Hype description')
        .max(1000),
      campaignWord: yup.string().required('Campaign word is required').label('Campaign word'),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
    authenticated,
  };
};
