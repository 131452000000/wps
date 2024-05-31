let body = JSON.parse($response.body);

// 模拟内购已完成状态
if (body.code === 1000000 && body.result === "ok") {
  // 遍历修改每个data项，假设它们包含需要内购的相关信息
  body.data.forEach(item => {
    if (item.config && item.config.material) {
      item.config.material.forEach(material => {
        material.element.list.forEach(element => {
          // 修改具体字段，例如更改sku_key表示已购买状态
          element.sku_key = "vip_pro";
          element.title = "你已经是超级会员";
          element.sub_title = "感谢您的支持！";
          element.button_title = "已解锁";
        });
      });
    }
  });
}

// 返回修改后的响应体
$done({body: JSON.stringify(body)});

[rewrite_local]
# 解锁WPS内购功能
^https:\/\/tiance.wps.cn\/dce\/exec\/api\/market\/activity url script-response-body unlock_wps.js

[mitm]
hostname = tiance.wps.cn
