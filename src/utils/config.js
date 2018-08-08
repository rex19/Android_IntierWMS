
/**
 * 公用get请求
 * @param loginUrl       登陆请求
 * @param GetWorkOrderUrl    get 工单请求
 * @param PostWorkOrderUrl   post 工单请求
 * @param PostTracebilityUrl   post 追溯请求
 */
const ip = '192.168.1.230'
const post = '80'
const api = 'SETUP'

// const ip = '192.168.1.252'
// const post = '80'
// const api = 'SETUP'



export const PublicParam = {
  name: 'WMS',
  mock: true,
  loginUrl: `http://${ip}:${post}/JYTrace/API/ApiCheckLogin/`,
  GetWorkOrderUrl: `http://${ip}:${post}/JYTrace/API/APIGetWorkOrder/?LineCode=`,
  PostWorkOrderUrl: `http://${ip}:${post}/JYTrace/API/ApiActivateWorkOrder/`,
  PostTracebilityUrl: `http://${ip}:${post}/JYTrace/API/ApiSetupMaterial/`,

  /**
   * wms-pda
   */
  // PostLoginUrl: `http://${ip}:${post}/SFMES/api/Login/Post`,
  PostLoginUrl: `http://${ip}:${post}/Setup/api/Login/UserLogin`,
  //移库
  GetALlFormTypeUrl: `http://${ip}:${post}/${api}/api/MovementRecord/GetALlFormType`,
  GetWMSFormByFormTypeIdUrl: `http://${ip}:${post}/${api}/api/MovementRecord/GetWMSFormByFormTypeId`,
  MovementRecordPostUrl: `http://${ip}:${post}/${api}/Api/MovementRecord/Post`,
  //安工单备料
  // GetAllMaterialPickingFormUrl: `http://${localIp}:${localPost}/sfwms/api/prepareMaterials/GetAllMaterialPickingForm`,
  // GetMaterialPickingFormItemOnedUrl: `http://${localIp}:${localPost}/sfwms/api/prepareMaterials/GetMaterialPickingFormItemOne/`,
  GetAllMaterialPickingFormUrl: `http://${ip}:${post}/${api}/api/MaterialPicking/GetAllMaterialPickingForm`,
  GetMaterialPickingFormItemOnedUrl: `http://${ip}:${post}/${api}/api/MaterialPicking/GetMaterialPickingFormItemOne`,
  PostSubmitUrl: `http://${ip}:${post}/${api}/Api/MaterialPicking/Post`,


  /**
   * SMT-PDA
   */
  //setup
  SetupGetLocationAndAreaForScanMaterialLocation: `http://${ip}:${post}/${api}/api/Setup/GetLocationAndAreaForScanMaterialLocation`,
  SetupGetLocationAndAreaForScanMaterialUID: `http://${ip}:${post}/${api}/api/Setup/GetLocationAndAreaForScanMaterialUID`,
  SetupGetNextLocationAndAreaForScanMaterial: `http://${ip}:${post}/${api}/api/Setup/GetNextLocationAndAreaForScanMaterial`,

  //program
  ProgramGetLocationAndAreaForScanMaterialLocation: `http://${ip}:${post}/${api}/api/Program/GetLocationAndAreaForScanMaterialLocation`,
  ProgramGetLocationAndAreaForScanMaterialUID: `http://${ip}:${post}/${api}/api/Program/GetLocationAndAreaForScanMaterialUID`,
  ProgramGetNextLocationAndAreaForScanMaterial: `http://${ip}:${post}/${api}/api/Program/GetNextLocationAndAreaForScanMaterial`,

  //ScanMaterialLocation
  ScanMaterialLocationGetMaterialNumberForScanMaterialLocation: `http://${ip}:${post}/${api}/api/ScanMaterialLocation/GetMaterialNumberForScanMaterialLocation`,
  ScanMaterialLocationGetIsProblemForScanMaterialLocation: `http://${ip}:${post}/${api}/api/ScanMaterialLocation/GetIsProblemForScanMaterialLocation`,

  //Feeding
  FeedingGetFeedingIsSuccessForScanMaterialLocation: `http://${ip}:${post}/${api}/api/Feeding/GetFeedingIsSuccessForScanMaterialLocation`,

  //ReceiveMaterial
  ReceiveMaterialGetMterialNumberForScanMaterialLocation: `http://${ip}:${post}/${api}/api/ReceiveMaterial/GetMterialNumberForScanMaterialLocation`,
  ReceiveMaterialGetMaterialIsProblemForScanMaterialLocation: `http://${ip}:${post}/${api}/api/ReceiveMaterial/GetMaterialIsProblemForScanMaterialLocation`,

  //NewOldFeeding
  NewOldFeedingGetOldMaterialForScanUID: `http://${ip}:${post}/${api}/api/NewOldFeeding/GetOldMaterialForScanUID`,
  NewOldFeedingGetIsSuccessForScanUID: `http://${ip}:${post}/${api}/api/NewOldFeeding/GetIsSuccessForScanUID`,

  //UnloadMaterial
  UnloadMaterialGetMaterialNumberForScanLocation: `http://${ip}:${post}/${api}/api/UnloadMaterial/GetMaterialNumberForScanLocation`,
  UnloadMaterialGetIsProblemForScanUID: `http://${ip}:${post}/${api}/api/UnloadMaterial/GetIsProblemForScanUID`,

}


// http://192.168.1.252/sfmeswms/api/MaterialPicking/GetMaterialPickingFormItemOne?materialPickingFormId=1&ItemNumber=0&getMode=0
