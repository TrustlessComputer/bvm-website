import { Box, Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import { DappDomain } from '@/services/api/DAServices/types';
import styles from './styles.module.scss';
import React from 'react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import Loading from '@components/Loading';
import BaseModal from '@components/BaseModal';
import { useFormik } from 'formik';

interface IProps {
  domain: DappDomain;
  onSetDomain?: (_: string) => Promise<void>
}

interface IDomainBoxProps extends IProps {
  title: string;
  description: string;
  editable: boolean;
}

interface IFormValues {
  domainURL: string;
}

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}


const removeHttp = (text: string) => {
  return text?.replace('http://', '')?.replace('https://', '')
}

const addHttp = (text: string) => {
  if (text.includes('https://') || text.includes('http://') || !text) return text;
  return `https://${text}`
}

const DomainBox = (props: IDomainBoxProps) => {
  const { title, description, editable, domain, onSetDomain } = props;
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [loading, setLoading] = React.useState(false)

  const domainURL = React.useMemo(() => editable ? domain?.user_domain : domain.bvm_app_store_domain, [domain.user_domain, domain.bvm_app_store_domain, editable])

  const isRemove = React.useMemo(() => !!domain?.user_domain, [domain?.user_domain]);

  const _onSetDomain = async (params: { domain: string }) => {
    try {
      setLoading(true);
      !!onSetDomain && await onSetDomain(params.domain)
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (values: IFormValues) => {
    await _onSetDomain({ domain: removeHttp(values.domainURL) })
    onClose();
  }

  const onValidate = (values: IFormValues) => {
    const errors: Record<string, string> = {};

    if (!values.domainURL) {
      errors.domainURL = 'Required.'
    } else if (!isValidUrl(values.domainURL || '')) {
      errors.domainURL = 'Invalid.'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      domainURL: ''
    } as IFormValues,
    onSubmit,
    validate: onValidate
  })

  return (
    <>
      <Flex gap={{ base: "24px", xl: "80px" }} flexDirection={{ base: "column", xl: "row" }}>
        <Flex flexDirection="column" gap="8px" maxW={{ base: "unset", xl: "560px" }}>
          <Text color="black" fontWeight="600" lineHeight="140%" fontSize={{ base: "18px", lg: "28px" }}>
            {title}
          </Text>
          <Text color="black" opacity="0.7" fontWeight="400" lineHeight="140%" fontSize={{ base: "14px", lg: "20px" }}>
            {description}
          </Text>
        </Flex>
        <Flex
          width='100%' maxW={{ base: 'unset', xl: '800px' }}
          borderRadius='8px'
          minHeight='80px'
          bg='transparent'
        >
          <table className={styles.table}>
            <thead>
            <tr>
              <th>Domain Name</th>
              <th>IP</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                {domainURL
                  ? (
                    <a href={addHttp(domainURL)} target='_blank'>
                      {removeHttp(domainURL)}
                    </a>
                  ) : '-'
                }
              </td>
              <td>{removeHttp((domain?.bvm_app_store_ip) || '-')}</td>
              <td>
                {editable && (
                  loading ? (
                    <Flex justifyContent="flex-end">
                      <Loading />
                    </Flex>
                  ) : (
                    <Flex justifyContent="flex-end">
                      <Box cursor="pointer" onClick={() => {
                        isRemove ? _onSetDomain({ domain: '' }) : onOpen()
                      }}>
                        {isRemove ? (
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25'
                               fill='none'>
                            <path
                              d='M20.75 6.5C20.75 6.914 20.414 7.25 20 7.25H4C3.586 7.25 3.25 6.914 3.25 6.5C3.25 6.086 3.586 5.75 4 5.75H8.21399C8.30699 5.568 8.37899 5.362 8.45599 5.132L8.65799 4.52499C8.86199 3.91299 9.43499 3.5 10.081 3.5H13.919C14.565 3.5 15.138 3.91299 15.342 4.52499L15.544 5.132C15.621 5.362 15.693 5.568 15.786 5.75H20C20.414 5.75 20.75 6.086 20.75 6.5ZM18.859 8.57001L18.19 18.7C18.08 20.28 17.25 21.5 15.19 21.5H8.81C6.75 21.5 5.92 20.28 5.81 18.7L5.14099 8.57001C5.12999 8.39701 5.267 8.25 5.44 8.25H18.559C18.733 8.25 18.87 8.39701 18.859 8.57001ZM13.061 14.5L14.531 13.03C14.824 12.737 14.824 12.262 14.531 11.969C14.238 11.676 13.763 11.676 13.47 11.969L12 13.439L10.53 11.969C10.237 11.676 9.76199 11.676 9.46899 11.969C9.17599 12.262 9.17599 12.737 9.46899 13.03L10.939 14.5L9.46899 15.97C9.17599 16.263 9.17599 16.738 9.46899 17.031C9.61499 17.177 9.80699 17.251 9.99899 17.251C10.191 17.251 10.383 17.178 10.529 17.031L11.999 15.561L13.469 17.031C13.615 17.177 13.807 17.251 13.999 17.251C14.191 17.251 14.383 17.178 14.529 17.031C14.822 16.738 14.822 16.263 14.529 15.97L13.061 14.5Z'
                              fill='#FF4747'
                            />
                          </svg>
                        ) : (
                          <PlusSquareIcon />
                        )}
                      </Box>
                    </Flex>
                  )
                )}
              </td>
            </tr>
            </tbody>
          </table>
        </Flex>
      </Flex>
      <BaseModal
        icCloseUrl="/icons/ic-close-grey.svg"
        className={styles.modalContent}
        isShow={isOpen}
        size="small"
        onHide={onClose}
        title="Add domain"
      >
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDirection="column" gap="16px">
            <Flex flexDirection="column" gap="4px">
              <Text color="black" opacity={0.7} fontSize="14px">
                Domain name
              </Text>
              <Input
                id='domainURL'
                color="black"
                border="1px solid rgba(0, 0, 0, 0.7)"
                value={formik.values.domainURL}
                onChange={formik.handleChange}
                placeholder="bvm.network"
              />
              <Text color="red" opacity={0.7} fontSize="12px">
                {formik.errors.domainURL}
              </Text>
            </Flex>
            <Button type="submit" bg="black" color="white" width="100%" height="48px" isDisabled={loading} isLoading={loading}>
              Submit
            </Button>
          </Flex>
        </form>
      </BaseModal>
    </>
  )
}

const DomainManager = (props: IProps) => {
  const { domain, onSetDomain } = props;
  return (
    <Flex flexDirection='column' gap='40px' flex='1'>
      <DomainBox
        title='Domain Name'
        editable={true}
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.'
        domain={domain}
        onSetDomain={onSetDomain}
      />
      <Box width='100%' height='1px' bg='#ECECEC' />
      <DomainBox
        editable={false}
        title='BVM Domain Name'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.'
        domain={domain}
        onSetDomain={onSetDomain}
      />
    </Flex>
  )
}

export default DomainManager;
