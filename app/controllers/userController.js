const teamModel = require('../model/teamModel')
const userModel = require('../model/userModel')

class UserController {
  async index(req, res, next) {
    try {
      const users = await userModel.find(
        {},
        {
          __v: 0,
        }
      )

      res.json(200, {
        result: users,
        status: 200,
      })
    } catch (error) {
      next(error)
    }
  }

  async store(req, res, next) {
    try {
      const { username, password, email, phone } = req.body
      const user = await userModel.create({
        username,
        password,
        email,
        phone,
      })
      await user.save()

      res.status(201).json({
        status: 201,
        message: 'کاربر جدید با موفقیت ایجاد شد . ',
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }

  async invitesAll(req, res, next) {
    try {
      const result = await userModel.findOne(
        { _id: req.user._id },
        { inviteRequest: 1 }
      )

      res.status(200).json({
        status: 200,
        result: result || [],
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }

  async filterInvite(req, res, next) {
    try {
      const { filter } = req.params
      switch (filter) {
        case 'pending':
          {
            const filterRequest = await userModel.aggregate([
              {
                $match: {
                  _id: req.user._id,
                },
              },
              {
                $project: {
                  inviteRequest: 1,
                  _id: 0,
                  inviteRequest: {
                    $filter: {
                      input: '$inviteRequest',
                      as: 'request',
                      cond: {
                        $eq: ['$$request.status', 'pending'],
                      },
                    },
                  },
                },
              },
            ])
            res.status(200).json({
              status: 200,
              success: true,
              result: filterRequest,
            })
          }
          break

        case 'reject':
          {
            const filterRequest = await userModel.aggregate([
              {
                $match: {
                  _id: req.user._id,
                },
              },
              {
                $project: {
                  inviteRequest: 1,
                  _id: 0,
                  inviteRequest: {
                    $filter: {
                      input: '$inviteRequest',
                      as: 'request',
                      cond: {
                        $eq: ['$$request.status', 'reject'],
                      },
                    },
                  },
                },
              },
            ])

            res.status(200).json({
              status: 200,
              success: true,
              result: filterRequest,
            })
          }
          break

        case 'accpet':
          {
            const filterRequest = await userModel.aggregate([
              {
                $match: {
                  _id: req.user._id,
                },
              },
              {
                $project: {
                  inviteRequest: 1,
                  _id: 0,
                  inviteRequest: {
                    $filter: {
                      input: '$inviteRequest',
                      as: 'request',
                      cond: {
                        $eq: ['$$request.status', 'accpet'],
                      },
                    },
                  },
                },
              },
            ])

            res.status(200).json({
              status: 200,
              success: true,
              result: filterRequest,
            })
          }
          break

        default:
          throw {
            status: 400,
            message: 'وضعیت نامشخص می  باشد . ',
            success: false,
          }
          break
      }
    } catch (error) {
      next(error)
    }
  }

  async changeStatus(req, res, next) {
    try {
      const {id,status} = req.params;
      const request=await userModel.findOne({'inviteRequest._id':id})
   
      if(!request) throw {status:404,message:"درخواستی وجود ندارد . ",success:false}
      const filterRequest=request.inviteRequest.filter((rq)=>{
        return rq._id == id
      })



      if(filterRequest[0].status !== 'pending') throw{status:400,message:"این درخواست قبلا پذیرفته شده است . ",success:false}

      const updateStatus=await userModel.updateOne({'inviteRequest._id':id},{
        $set:{
          "inviteRequest.$.status":status
        }
      })
      

      if(updateStatus.modifiedCount === 0) throw {status:500,message:"مشکل در عملیات ابدیت درخواست وجود آمده است . ",success:false}
      

      await teamModel.updateOne({
        _id:filterRequest[0].teamId
      },{
        $push:{
          users:[request._id]
        }
      })
      res.status(200).json({
        status:200,
        message:"درخواست شما با موفقیت ابدیت شد .",
        success:true
      })
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
