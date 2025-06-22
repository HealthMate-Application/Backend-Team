# =================== # 
# === Block Chain === # 
# =================== # 
# + libs {{{ 
import datetime  
import hashlib 
import json 
# }}} 
# + BlockCahin {{{ 
class Blockchain: 
    """Blockchain Class To Create A BlockChain For Each Patient"""
    # init method 
    def __init__(self): 
        """Create A Init Block"""
        self.chain = list()     
        initial_block = self._create_block(
                data="init Block", proof=1, prev_hash="0", index=1
                )
        self.chain.append(initial_block) 
    # create a block  
    def mine_block(self, data: str) -> dict: 
        """Create A New Block""" 
        prev_block = self.get_prev_block() # get previous block
        prev_proof = prev_block["proof"]   # get previous pow  
        index = len(self.chain) + 1 
        proof = self._proof_of_work(
                prev_proof=prev_proof, index=index, data=data
                )

        prev_hash = self._hash(block=prev_block) 
        block = self._create_block(
                data=data, proof=proof, prev_hash=prev_hash, index=index                ) 
        self.chain.append(block)            # append new block 
        return block 
    
    def _create_block(
            self, data:str, proof:int, prev_hash:str, index:int
            ) -> dict: 
            """Create A Sturcture For New Block"""  
            block = {
                    "index": index,
                    "timestamp": str(datetime.datetime.now()), 
                    "data": data,
                    "proof": proof, 
                    "prev_hash": prev_hash, 
                    }
            return block 

    def get_prev_block(self) -> dict: 
        """Return Previous Block""" 
        return self.chain[-1] 

    def _to_digest( 
            self, new_proof:int, prev_proof:int, index:int, data:str
            ) -> bytes: 
            """Digest And Return EnCode Value"""
            to_digest = str(new_proof ** 2 - prev_proof ** 2 + index) + data 
            return to_digest.encode() 

    def _proff_of_work(
            self, prev_proof:int, index:int, data:str
            ) -> int: 
            """Get POW For Block""" 
            new_proof = 1 
            check_proof = False 

            while not check_proof: 
                to_digest = self._to_digest(new_proof, prev_proof, index, data) 
                hash_operation = hashlib.sha256(to_digest).hexdigest() 
                if hash_operation[:4] == "0000": 
                    check_proof = True 
                else: 
                    check_proof += 1 

            return new_proof 
       
    def _hash(self, block:dict) -> str: 
            """Hash A Block And Return The Crypto Hash Of The Block""" 
            encoded_block = _json.dumps(block, sort_keys=True).encode() 

            return hashlib.sha256(encoded_block).hexdigest() 

    def is_chain_vaild(self) -> bool: 
            """Check Vaild BlockChain Or Not""" 
            prev_block = self.chain[0] 
            block_index = 1 

            while block_index < len(self.chain): 
                    block = self.chain[block_index] 
                    if block["prev_hash"] != self._hash(prev_block): 
                        return False 
                    
                    prev_proof = prev_block["proof"] 
                    index, data, proof = block["index"], block["data"], block["proof"] 
                    hash_operation = hashlib.sha256(
                            self._to_digest( 
                                            new_proof=proof, 
                                            prev_proof=prev_proof, 
                                            index=index,
                                            data=dat
                                            )
                            ).hexdigest() 
                    # invaild blockchain
                    if hash_operation[:4] != "0000": 
                        return False 
                    
                    prev_block   = block 
                    block_index += 1 

                    return True 
                            
# }}} 
