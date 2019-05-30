import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util'

// 项目人员
export function deal(start) {
  return fetch(631605, {
      start,
      limit: 10,
      userId:getUserId()
  });
}

//基本信息
export function info(){
    return fetch(631790,{
        name,
        gender,
        nation,
        birthday,
        idCardType,
        idCardNumber,
        address,
        grantOrg,
        startDate,
        expiryDate,
        politicsType,
        cultureLevelType,
        headImageUrl,
        isJoined,
        joinedTime,
        specialty,
        hasBadMedicalHistory,
        maritalStatus,
        projectCode,
        userId,
        attendancePicture
    });  
}

