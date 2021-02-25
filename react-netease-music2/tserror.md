- eslint在ts文件不起作用
    "eslint.validate": [ "javascript", "javascriptreact", "typescript", "typescriptreact" ]
- 找不到模块 “./index.less”, 找不到模块 “XX/XX/XXX.png”

    1. 创建 externals.d.ts 文件
    2. 创建 typings 文件夹，创建index.d.ts文件
    ```
    declare module "*.less" {
     const less: any;
     export default less;
    }
    declare module '*.png' {
     const url: string;
     export default url;
    }
    ```
- 无法找到模块“@antv/data-set”的声明文件
  ```
  declare module "XXX" {
   const XXX: any;
   export default XXX;
 }
  ```
- 别名引用报错,tsconfig文件配置
  ```
  "paths": {
    "@/*": ["./src/*"],
    },
  ```
- window下的模块报错 
  ```
  interface Window {
	XXX: any;
  }
  ```
- TSLint: Identifier 'injector' is never reassigned; use 'const' instead of 'let'. (prefer-const)
    解决方法在tslint.json下添加一个"prefer-const": false

- ts vue报错
```
报错 后台只需要传递空{ }
 async listAsPage() {
    const result = await getRuleTreeUrl({});
    this.data = result.list ? result.list : new getRuleTreeUrl() ;
  }
正确
async listAsPage() {
    const result = await getRuleTreeUrl({});
    this.data = result.list ? result.list : void getRuleTreeUrl({}) ; 
 }


 TS 报错
submitCheckAdAccount(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        this.checkAdAccount();
      } else {
        return false;
      }
    });
  }

正确
submitCheckAdAccount(formName) {
     (this.$refs[formName] as any).validate((valid) => {
      if (valid) {
        this.checkAdAccount();
      } else {
        return false;
      }
    });
  }



 ts报错
 reset(formName) {
    this.$refs[formName].resetFields();
  }

 正确
 reset(formName) {
    const ref: any = this.$refs[formName];
    ref.resetFields();
  }
```