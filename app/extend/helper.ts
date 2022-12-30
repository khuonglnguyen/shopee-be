

// 处理成功响应
exports.response = {
    success: ({ ctx, data = {} }) => {
      ctx.set('cache-control', [
        'no-cache',
        'no-store',
        'must-revalidate',
      ].join(', '));
  
      ctx.body = {
        success: true,
        data,
        errorCode: 0,
        errorMessage: 'Success',
        traceId: ctx.traceId,
        host: ctx.app.localIp,
      };
  
      ctx.status = 200;
    },
  
    /**
     * 统一报错处理
     *
     * @param {Object} error 错误对象
     * @param {Context} error.ctx 上下文对象
     * @param {integer} error.code 错误编号
     * @param {string} error.message 错误信息
     * @param {integer} error.type 错误提示方式 0 silent; 1 message.warn; 2 message.error; 4 notification; 5 form; 9 page
     */
    error: ({ ctx, data = {}, code = 500, message = 'System error!', type = 2 }) => {
      ctx.set('cache-control', [
        'no-cache',
        'no-store',
        'must-revalidate',
      ].join(', '));
  
      ctx.body = {
        success: false,
        data,
        errorCode: code,
        errorMessage: message,
        showType: type,
        traceId: ctx.traceId,
        host: ctx.app.localIp,
      };
  
      ctx.status = 200;
    },
  };
  
  
  /**
   * Stream转Buffer
   * @param {Stream} stream 读取流
   * @return {Buffer} buffer流
   */
  exports.streamToBuffer = async stream => {
    return new Promise((resolve, reject) => {
      const buffers = [];
      stream.on('data', data => { buffers.push(data as never); });
      stream.on('end', async () => {
        const buffer = Buffer.concat(buffers);
        resolve(buffer);
      });
      stream.on('error', error => {
        reject(error);
      });
    });
  };
  
  