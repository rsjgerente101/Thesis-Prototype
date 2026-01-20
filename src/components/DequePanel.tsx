import React, { useState } from 'react';
import { Representative } from '../types';
import { RepresentativeCard } from './RepresentativeCard';
import { Card } from './Card';
import { Button } from './Button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface DequePanelProps {
  representatives: Representative[];
  onUpdate: (reps: Representative[]) => void;
}

export function DequePanel({ representatives, onUpdate }: DequePanelProps) {
  const [unassignedPool, setUnassignedPool] = useState<string[]>([]);

  const handlePushFront = (repId: string) => {
    const updatedReps = [...representatives];
    const repIndex = updatedReps.findIndex(r => r.id === repId);
    if (repIndex > 0) {
      const [rep] = updatedReps.splice(repIndex, 1);
      updatedReps.unshift(rep);
      onUpdate(updatedReps);
    }
  };

  const handlePushBack = (repId: string) => {
    const updatedReps = [...representatives];
    const repIndex = updatedReps.findIndex(r => r.id === repId);
    if (repIndex < updatedReps.length - 1) {
      const [rep] = updatedReps.splice(repIndex, 1);
      updatedReps.push(rep);
      onUpdate(updatedReps);
    }
  };

  return (
    <Card>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Deque Panel</h3>
        <p className="text-xs text-gray-600">
          Manage workload distribution across representatives
        </p>
      </div>

      {/* Front/Rear Indicator */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-blue-900">Front of Queue</span>
          <ArrowRightIcon className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-900">Rear of Queue</span>
        </div>
      </div>

      {/* Representatives List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {representatives.map((rep, index) => (
          <div key={rep.id} className="relative">
            {/* Position Indicator */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
              {index === 0
                ? 'F'
                : index === representatives.length - 1
                ? 'R'
                : index + 1}
            </div>

            {/* Representative Card */}
            <RepresentativeCard representative={rep} isDraggable={true} />

            {/* Push Front / Push Back Buttons */}
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePushFront(rep.id)}
                disabled={index === 0}
                className="flex-1 flex items-center justify-center text-xs gap-1"
              >
                <ArrowLeftIcon className="w-3 h-3" />
                Push Front
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePushBack(rep.id)}
                disabled={index === representatives.length - 1}
                className="flex-1 flex items-center justify-center text-xs gap-1"
              >
                Push Back
                <ArrowRightIcon className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Unassigned Pool */}
      {unassignedPool.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">
            Unassigned Pool
          </h4>
          <div className="flex flex-wrap gap-1">
            {unassignedPool.map(custId => (
              <span
                key={custId}
                className="px-2 py-1 bg-yellow-100 text-xs rounded text-yellow-800 cursor-pointer hover:bg-yellow-200"
              >
                {custId}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
