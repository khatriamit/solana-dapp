import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
    Account,
    getMint,
    getAccount,
} from "@solana/spl-token";

window.Buffer = window.Buffer || require("buffer").Buffer;

function MintToken() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromWallet = Keypair.generate();
    let mint: PublicKey;
    let fromTokenAccount: Account;

    async function createToken() {
        const formAirdropSignature = await connection.requestAirdrop(
            fromWallet.publicKey,
            LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(formAirdropSignature);

        mint = await createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            null,
            9  // decimals of 9 0's
        );
        console.log(`Create token: ", ${mint.toBase58()}`);

        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey,
        );
        console.log(`Create token account: ", ${fromTokenAccount.address.toBase58()}`);


    }
    return (
        <div>
            Mint Token Section
            <div>
                <button onClick={createToken}>Create Token</button>
                <button>Mint TOken</button>
                <button>Check Balance</button>
                <button>Send Token</button>
            </div>
        </div>
    );
}

export default MintToken;