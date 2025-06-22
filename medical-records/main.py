# ========================== # 
# === Patient BlockChain === # 
# ========================== # 
# + libs {{{ 
import fastapi as _fastapi
import blockchain as _blockchain 
# }}} 
# + global vars {{{ 
blockchain = _blockchain.Blockchain() 
app = _fastapi.FastAPI() 
# }}} 
# + Routes {{{ 
# checkt health of backend 
@app.get("/health") 
async def is_health(): 
    """check health of backend""" 
    return {"status": "Healthy"} 

# create a new blockchain 
@app.post("/mine_block") 
async def mine_block(data:str): 
    """create a new block""" 
    if not blockchain.is_chain_vaild(): 
        return _fastapi.HTTPException(status_code=400, detail="The BlockChain is invaild" )
    block = blockchain.mine_block(data=data)
    return block 

# get the blockchain blocks 
@app.get("/blockchain/")
async def get_blockchain(): 
    """Get The Blockchain blocks""" 
    if not blockchain.is_chain_vaild(): 
        return _fastapi.HTTPException(status_code=400, detail="The BlockChain is invaild" )
    chain = blockchain.chain 
    return chain 

# check vaildition for blockchain 
@app.get("/validate")
async def is_blockchain_vaild(): 
    """check vaildition for blockchian""" 
    if not blockchain.is_chain_vaild(): 
       return _fastapi.HTTPException(status_code=400, detail="The BlockChain is invaild" )
    
    return blockchain.is_chain_vaild() 

# get the last block 
@app.get("/blockhain/last/")
def prev_block(): 
    """get the last block""" 
    if not blockchain.is_chain_vaild(): 
       return _fastapi.HTTPException(status_code=400, detail="The BlockChain is invaild" )
    
    return blockchain.get_prev_block()
# }}} 
