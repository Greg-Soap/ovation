import { ArchwayClient } from '@archwayhq/arch3.js';

export const getNfts = async () => {
    try {
        // Connect to the Archway blockchain
        const client = await ArchwayClient.connect('https://rpc.constantine.archway.io');

        // Define contract address and owner address
        const cw721ContractAddress = 'archway1r9qqfl2ptc96frn3tx4k2n967xc64uwxg2j9xn2rvsm882fu04kq3hutsv';
        const ownerAddress = 'archway1q73znqs6ehcgng3a8nrmz6esw2mj37d0cl4luk';

        // Query the smart contract
        const result = await client.queryContractSmart(cw721ContractAddress, { tokens: { owner: ownerAddress } });

        // Log the result
        console.log('\nQUERY RESULT:\n', result);

        // Disconnect the client
        client.disconnect();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}