import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';

export function Home() {

  const [statusSelected, setStatusSelected] = useState<'open' | 'closed' > ('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '416',
      patrimony: '113528',
      when: '21/07/2022 às 14:00',
      status: 'open'
    },
    {
      id: '417',
      patrimony: '132548',
      when: '20/07/2022 às 13:00',
      status: 'open'
    },
    {
      id: '418',
      patrimony: '563428',
      when: '19/07/2022 às 21:00',
      status: 'open'
    },
    {
      id: '419',
      patrimony: '1133422',
      when: '19/07/2022 às 11:44',
      status: 'open'
    },
    {
      id: '420',
      patrimony: '536243',
      when: '18/07/2022 às 13:40',
      status: 'open'
    },
    {
      id: '421',
      patrimony: '177543',
      when: '17/07/2022 às 14:00',
      status: 'open'
    },
    {
      id: '422',
      patrimony: '7645234',
      when: '16/07/2022 às 07:00',
      status: 'open'
    },
    {
      id: '423',
      patrimony: '633434',
      when: '15/07/2022 às 14:23',
      status: 'open'
    },
    {
      id: '424',
      patrimony: '1745234',
      when: '14/07/2022 às 09:35',
      status: 'open'
    }
    

  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();

// função para interação de click do usuário em "nova solicitação"
  function handleNewOrder(){
    navigation.navigate('new');
    
  }

  function handleOpenDetails(orderId: string){
    navigation.navigate('details', {orderId});
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
        <HStack 
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
        >
            <Logo />
    
            
            <IconButton
             icon={<SignOut size={26} color={colors.gray[300]} />} 

            />

        </HStack>


        <VStack flex={1} px={6}>
          <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">

          <Heading color="gray.100">
            Solicitações
          </Heading>

          <Text color="gray.200"> 
            {orders.length}
          
          </Text>
      </HStack>

      <HStack space={3} mb={8}>
        <Filter
          type="open"
          title="em andamento"
          onPress={() => setStatusSelected('open')}
          isActive={statusSelected === 'open'}
          
        />

        <Filter
          type="closed"
          title="finalizados"
          onPress={() => setStatusSelected('closed')}
          isActive={statusSelected === 'closed'}
          
        />
      </HStack>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        ListEmptyComponent={() => (
          <Center> 
            <ChatTeardropText color={colors.gray[300]} size={40} />
            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
              Você ainda não possui {'\n'}
              solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
            </Text>
          </Center>
        )}
      />
      <Button title="Nova Solicitação" onPress={handleNewOrder} />

    </VStack>
   </VStack>
        
   
  );
}

