// @flow

export const withBackground = (image : string) => ({
  'data-stellar-background-ratio': '0.2',
  style: {
    background: `url(${image}) center center / cover no-repeat`
  }
});
