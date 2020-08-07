import {asyncWrapper} from '../../lib/helper'
const getTest = asyncWrapper(async (req, res) => {
    // dao.params.name = req.query.user_name;
    // dao.params.user_id = req.query.user_id;
    // dao.params.password = req.query.password;
    // const result = await dao.getUserInfo(); db query 예시
    const result = "hello !"
    res.json(result)
})

module.exports = {
    getTest:getTest,
}