import createService from './service';

export const holyKPI = createService({
  monthlyVolume: null,
  userTarget: 0,
  userCurrent: 0,
  retentionTarget: 0,
  retentionCurrent: 0,
});
export const tetImtoken = createService({
  newUsers: 0,
  userTarget: 0,
  userCurrent: 0,
});
