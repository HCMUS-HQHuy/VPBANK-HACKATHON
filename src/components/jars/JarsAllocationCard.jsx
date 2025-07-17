// src/components/jars/JarsAllocationCard.jsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 
import JarsIcon from '@/utils/JarsIcon'; 

// CẬP NHẬT TOÀN DIỆN LOGIC CỦA COMPONENT CON
const JarCard = ({ icon, name, spentAmount, total, color, bgColor }) => {
    
    // 1. TÍNH TOÁN LẠI DỮ LIỆU CHO ĐÚNG
    // Số tiền còn lại thực tế
    const actualRemaining = total - spentAmount;

    // Tỷ lệ đã sử dụng (để quyết định MÀU SẮC và CHIỀU RỘNG)
    const usagePercentage = total > 0 ? (spentAmount / total) * 100 : 0;
    
    // Chiều rộng của thanh tiến trình không bao giờ vượt quá 100%
    const progressWidth = Math.min(100, usagePercentage);

    // 2. LOGIC CHỌN MÀU DỰA TRÊN TỶ LỆ ĐÃ SỬ DỤNG
    let progressBarColor;
    if (usagePercentage >= 100) {
        progressBarColor = 'bg-danger'; // Đỏ đậm khi bằng hoặc vượt 100%
    } else if (usagePercentage >= 90) {
        progressBarColor = 'bg-danger/70'; // Đỏ nhạt
    } else if (usagePercentage >= 80) {
        progressBarColor = 'bg-yellow'; // Vàng
    } else {
        progressBarColor = bgColor; // Màu mặc định của hũ
    }

    return (
        <div className={`relative p-5 border border-border rounded-xl flex flex-col bg-card hover:bg-card-secondary transition-colors duration-200`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={icon} className={`text-xl w-6 text-center ${color}`}/>
                    <h4 className="font-bold text-text-primary capitalize">{name.replace(/_/g, ' ')}</h4>
                </div>
            </div>
            <div className="mt-4 flex-grow">
                <p className="text-sm font-medium text-text-secondary">Remaining</p>
                {/* 3. HIỂN THỊ ĐÚNG SỐ TIỀN CÒN LẠI (actualRemaining) */}
                <p className="text-2xl font-bold text-text-primary">
                    ${actualRemaining.toFixed(2)} 
                    <span className="text-lg font-normal text-text-secondary"> / ${total.toFixed(2)}</span>
                </p>
            </div>
            <div className="mt-2">
                <div className="w-full bg-card-secondary rounded-full h-2.5">
                    {/* 4. ÁP DỤNG MÀU SẮC VÀ CHIỀU RỘNG ĐÃ TÍNH TOÁN LẠI */}
                    <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ${progressBarColor}`} 
                        style={{ width: `${progressWidth}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const JarsAllocationCard = ({ jars = [], onManageClick }) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">Jars Allocation & Status</h3>
            <button onClick={onManageClick} className="flex items-center gap-2 text-sm font-semibold text-text-accent hover:underline transition-colors">
                <FontAwesomeIcon icon={faPencilAlt} />
                <span>Manage Allocation</span>
            </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {jars.length > 0 ? (
          jars.map((jar) => {
            const jarKey = jar.name.toLowerCase().replace(/\s/g, '_');
            const iconInfo = JarsIcon[jarKey] || JarsIcon.Default;
            
            return (
              <JarCard 
                key={jar.id || jar._id}
                icon={iconInfo.icon}
                color={iconInfo.color}
                bgColor={iconInfo.bg}
                name={jar.name} 
                // CẬP NHẬT: Truyền `current_amount` vào prop `spentAmount` để code rõ ràng hơn
                spentAmount={jar.current_amount}
                total={jar.amount}          
              />
            )
          })
        ) : (
          <p className="col-span-full text-center text-text-secondary py-4">No jars have been set up.</p>
        )}
        </div>
    </div>
  );
};

export default JarsAllocationCard;